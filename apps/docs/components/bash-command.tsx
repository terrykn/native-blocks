import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

export function BashCommand({ command }: { command: string }) {
  return (
    <div className="dark">
      <CodeBlock>
        <Pre className="text-white bg-fd-muted">
          <code>{command}</code>
        </Pre>
      </CodeBlock>
    </div>
  );
}
