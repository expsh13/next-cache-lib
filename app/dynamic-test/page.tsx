// Dynamic Renderingを強制するための設定
export const dynamic = "force-dynamic";

export default async function DynamicTestPage() {
  // 現在の時刻を取得してフォーマット
  const currentTime = new Date().toLocaleString("ja-JP");

  // JSONPlaceholderからデータを取得（キャッシュオプションなし）
  // Next.js 15ではデフォルトで cache: 'no-store' として動作
  const response = await fetch("https://httpbin.org/uuid");
  const data = await response.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Rendering Test</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold">レンダリング時間</h2>
        <p className="text-gray-700">{currentTime}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">取得データ</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <div className="p-4 bg-blue-100 rounded">
        <h3 className="font-bold mb-2">Next.js 15でのキャッシュ動作</h3>
        <p>
          <strong>注：</strong> Next.js 15では、fetchのデフォルト動作が変更され、
          オプションを指定しない場合でも<code>cache: &apos;no-store&apos;</code>として動作するようになりました。
          そのため、このページでは:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>force-dynamicにより、ページは毎回サーバーでレンダリングされます</li>
          <li>fetchデータも毎回再取得されます（キャッシュされません）</li>
          <li>UUIDが毎回変わることで、データが再取得されていることが確認できます</li>
        </ul>
      </div>
    </div>
  );
}