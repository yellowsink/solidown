import { createResource, createSignal } from "solid-js";
import { Remarkable } from "remarkable";

export default ({ children, src, css, loading }) => {
  const getMarkdownSource = async () => await (await fetch(src)).text();

  const [fetchSignal, setFetchSignal] = createSignal(false);
  let [markdown] = src
    ? createResource(fetchSignal, getMarkdownSource)
    : [() => children];

  const md = new Remarkable();

  const LoadingComponent = () =>
    typeof loading === "string" ? <div class="solidown-loading">{loading}</div> : <loading />;

  return (
    <div class="solidown-wrapper">
      <div class={`solidown-markdown-root`}>
        {markdown() ? md.render(markdown()) : <LoadingComponent />}
      </div>

      {css ? <style>{css}</style> : []}
    </div>
  );
};
