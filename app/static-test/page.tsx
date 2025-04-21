// 静的レンダリングが適用される（デフォルト）

export default async function StaticTestPage() {
  // 現在の時刻を取得してフォーマット
  const currentTime = new Date().toLocaleString("ja-JP");

  // オプションなしのfetch - 静的レンダリングのため実質的にキャッシュされる
  const response = await fetch("https://httpbin.org/uuid");
  const data = await response.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Static Rendering Test</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold">ビルド時間</h2>
        <p className="text-gray-700">{currentTime}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">取得データ</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <div className="p-4 bg-purple-100 rounded">
        <h3 className="font-bold mb-2">
          Next.js 15での静的レンダリングとキャッシュの関係
        </h3>
        <p>
          <strong>注：</strong> このページでは:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>静的レンダリングがデフォルトで適用されます（dynamic指定なし）</li>
          <li>
            Next.js 15では、fetchにオプションを指定しないとデフォルトでは<code>cache: &apos;no-store&apos;</code>となります
          </li>
          <li>
            ただし、静的レンダリングのページでは、ページ全体がビルド時にレンダリングされます
          </li>
          <li>
            そのため、個々のfetchのキャッシュ設定に関わらず、データは実質的にキャッシュされます
          </li>
          <li>ページをリロードしても、時間とUUID値は変わりません</li>
        </ul>
        <p className="mt-2">
          この動作から、
          <strong>
            静的レンダリングのコンテキストでは、fetchのキャッシュ設定よりも
            ページのレンダリング戦略が優先される
          </strong>
          ことがわかります。
        </p>
      </div>
    </div>
  );
}