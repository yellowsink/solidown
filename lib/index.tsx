import { createResource, createSignal, JSXElement } from "solid-js";
import { Remarkable } from "remarkable";

interface SolidownProps {
  children: string
  src?: string
  css?: string
  loading?: JSXElement | string
}
export default ({ children, src, css, loading }: SolidownProps) => {
  let getMarkdownSource = async () => children;

  if (src) {
    const fullSrc = document?.location ? new URL(src, document.location.origin).href : src;
    getMarkdownSource = async () => await (await fetch(fullSrc)).text();
  }

  const [fetchSignal, setFetchSignal] = createSignal();
  const [markdown] = createResource(fetchSignal, getMarkdownSource)

  setFetchSignal(0);

  loading = loading ?? "Loading";

  const LoadingComponent = () =>
    typeof loading === "string" ? (
      <div class="solidown-loading">{loading}</div>
    ) : (
      loading
    );

  const md = new Remarkable("full", {
		html: true
	});

  return (
    <div class="solidown-wrapper">
      {markdown() ? (
        <div
          class={`solidown-markdown-root`}
          innerHTML={md.render(markdown() ?? "")}
        />
      ) : (
        <LoadingComponent />
      )}

      {css ? <style>{css}</style> : []}
    </div>
  );
};
