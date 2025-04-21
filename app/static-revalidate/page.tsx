// 静的レンダリングがデフォルト適用される（dynamic指定なし）

export default async function StaticRevalidatePage() {
  // 現在の時刻を取得してフォーマット
  const currentTime = new Date().toLocaleString("ja-JP");

  // revalidateオプションを設定（5秒）
  const response = await fetch("https://httpbin.org/uuid", {
    next: { revalidate: 5 } // 5秒ごとにデータを再検証
  });
  const data = await response.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Static Rendering with Revalidation</h1>

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

      <div className="p-4 bg-purple-100 rounded">
        <h3 className="font-bold mb-2">Revalidateオプション付き静的レンダリング</h3>
        <p>
          <strong>注：</strong> このページでは:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>静的レンダリングがデフォルトで適用されます（dynamic指定なし）</li>
          <li>fetchに<code>next: &#123; revalidate: 5 &#125;</code>を指定しています</li>
          <li>これにより、5秒経過後の最初のリクエストでデータが再取得されます</li>
          <li>再取得後は、また5秒間そのデータがキャッシュされます</li>
          <li>ISR (Incremental Static Regeneration) と呼ばれる動作です</li>
        </ul>
        <p className="mt-2">
          <strong>検証方法：</strong> このページを開いた後、5秒以上待ってからリロードしてください。
          UUIDと時間が更新されるはずです。その後再度リロードすると、5秒経過するまでは同じデータが表示されます。
        </p>
      </div>
    </div>
  );
}