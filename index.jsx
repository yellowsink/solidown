import { createResource, createSignal } from "solid-js";

export default ({ children, src }) => {
  const getMarkdownSource = async () => await (await fetch(src)).text();

  const [fetchSignal, setFetchSignal] = createSignal(false);
  let [markdown] = src
    ? createResource(fetchSignal, getMarkdownSource)
    : [children];

		
  return <div />;
};
