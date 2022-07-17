export interface LinkProps {
  text: string;
  url: string;
}

function LinkUrl({ text, url }: LinkProps) {
  return (
    <a className="text-blue-500" href={url} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
}

export default LinkUrl;
