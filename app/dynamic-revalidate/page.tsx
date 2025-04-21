// Dynamic Renderingを強制するための設定
export const dynamic = "force-dynamic";

export default async function DynamicRevalidatePage() {
  // 現在の時刻を取得してフォーマット
  const currentTime = new Date().toLocaleString("ja-JP");

  // revalidateオプションを設定（5秒）- 動的レンダリングでの動作を検証
  const response = await fetch("https://httpbin.org/uuid", {
    next: { revalidate: 5 } // 5秒ごとにデータを再検証
  });
  const data = await response.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Rendering with Revalidation</h1>

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
        <h3 className="font-bold mb-2">Revalidateオプション付き動的レンダリング</h3>
        <p>
          <strong>検証結果：</strong> このページでは次の動作が確認できました:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>force-dynamicにより、ページは<strong>毎回</strong>サーバーでレンダリングされます（時間が更新される）</li>
          <li>しかし、fetchデータは<strong>5秒間</strong>キャッシュされます（UUIDは5秒間同じ値）</li>
          <li>これは、動的レンダリングと`revalidate`が別々の機能として動作することを示しています</li>
        </ul>
        <p className="mt-2">
          <strong>結論：</strong> 動的レンダリング（force-dynamic）はページのレンダリング戦略に影響し、
          revalidateはデータのキャッシュ期間に影響します。この2つの機能は互いに独立して動作します。
        </p>
      </div>
    </div>
  );
}