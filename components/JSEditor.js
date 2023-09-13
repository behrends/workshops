import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import * as Themes from '@codesandbox/sandpack-themes';

export default function JSEditor({ code = '// Code einfügen' }) {
  return (
    <SandpackProvider
      template="vanilla"
      files={{ 'index.js': code }}
      theme={Themes.githubLight}
    >
      <div style={{ border: '1px solid #CCC' }}>
        <SandpackCodeEditor />
        <SandpackConsole style={{ maxHeight: '300px' }} />
        <SandpackPreview
          style={{ height: '120px' }}
          showRefreshButton={false}
          showOpenInCodeSandbox={false}
        />
      </div>
    </SandpackProvider>
  );
}
