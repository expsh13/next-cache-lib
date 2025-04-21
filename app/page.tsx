import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Next.js 15 キャッシュ検証</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded">
          <h2 className="text-lg font-bold mb-2">基本キャッシュ動作検証</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Link
                href="/static-test"
                className="text-blue-600 hover:underline"
              >
                静的レンダリング（オプションなしのfetch）
              </Link>
            </li>
            <li>
              <Link
                href="/dynamic-test"
                className="text-blue-600 hover:underline"
              >
                Dynamic Rendering（オプションなしのfetch）
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <h2 className="text-lg font-bold mb-2">Revalidateオプション検証</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Link
                href="/static-revalidate"
                className="text-blue-600 hover:underline"
              >
                静的レンダリング + revalidate: 5秒
              </Link>
            </li>
            <li>
              <Link
                href="/dynamic-revalidate"
                className="text-blue-600 hover:underline"
              >
                Dynamic Rendering + revalidate: 5秒
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded mb-6">
        <h2 className="text-lg font-bold mb-2">Next.js 15のキャッシュ変更</h2>
        <p className="mb-2">
          Next.js 15では、fetchのデフォルト動作が
          <code>cache: &apos;force-cache&apos;</code>から
          <code>cache: &apos;no-store&apos;</code>
          に変更されました。つまり、オプションを指定しない場合、
          データはデフォルトでキャッシュされなくなりました。
        </p>
        <p className="mb-2">
          しかし、<strong>静的レンダリング</strong>
          のページでは、ページ全体がビルド時にレンダリングされるため、
          fetchのキャッシュ設定に関わらず、データは実質的にキャッシュされます。
        </p>
        <p>
          また、<strong>revalidate</strong>
          オプションを使用すると、指定した秒数経過後に
          データを再検証（再フェッチ）できます。これにより、静的生成とデータの鮮度の両方を
          実現できます。
        </p>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">検証結果まとめ</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            静的レンダリングページ:
            時間とデータは変わらない（ページ全体がキャッシュされる）
          </li>
          <li>
            Dynamic Renderingページ: 時間とデータ両方が更新される（Next.js
            15の新動作）
          </li>
          <li>
            静的 + Revalidate: 5秒経過後revalidateされ、Data
            Cacheが更新されるのでFull Route Cacheなども更新される
          </li>
          <li>
            Dynamic + Revalidate:{" "}
            <strong>時間は毎回更新、データは5秒ごとに更新</strong>
            （ページレンダリングとデータキャッシュが独立して動作）
          </li>
        </ul>

        <div className="mt-4 p-3 bg-blue-50 rounded">
          <h3 className="font-bold mb-2">重要な発見</h3>
          <p>
            動的レンダリング（force-dynamic）とrevalidateは独立して動作します。動的レンダリングはページのレンダリング戦略に影響し、revalidateはフェッチデータのキャッシュ期間を制御します。これにより、ページコンテンツを毎回更新しながらも、特定のデータフェッチを一定期間キャッシュすることが可能です。
          </p>
        </div>
      </div>
    </div>
  );
}
