import { useState, useEffect } from "react";
import { auth, fetchConfig, fetchData } from "../apis";

export function WaterfallDemo() {
  const [time, setTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{ data: unknown; config: unknown } | null>(null);

  useEffect(() => {
    const start = performance.now();

    async function fetchWithWaterfall() {
      // ❌ 错误写法：顺序执行（瀑布流）
      const session = await auth(); // 等待 100ms
      const config = await fetchConfig(); // 再等待 100ms
      const data = await fetchData(session.user.id); // 再等待 100ms
      return { data, config };
    }

    fetchWithWaterfall().then((res) => {
      const elapsed = performance.now() - start;
      setTime(elapsed);
      setResult(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="demo waterfall">
      <h3>❌ Waterfall (Sequential)</h3>
      <p className="description">
        顺序执行：auth → fetchConfig → fetchData
      </p>
      <p className="time">
        <strong>Time:</strong> {loading ? "..." : `${time.toFixed(0)}ms`}
      </p>
      {result && (
        <pre className="result">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
