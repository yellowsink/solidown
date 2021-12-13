import { createResource, createSignal } from "solid-js";
import { Remarkable } from "remarkable";

export default ({ children, src, css, loading }) => {
  const fullSrc = document?.location ? new URL(src, document.location.origin).href : src;
  const getMarkdownSource = async () => await (await fetch(fullSrc)).text();

  const [fetchSignal, setFetchSignal] = createSignal();
  const [markdown] = src
    ? createResource(fetchSignal, getMarkdownSource)
    : [() => children];

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
          innerHTML={md.render(markdown())}
        />
      ) : (
        <LoadingComponent />
      )}

      {css ? <style>{css}</style> : []}
    </div>
  );
};
