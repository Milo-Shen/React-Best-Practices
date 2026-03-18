import { useState, useEffect } from "react";
import { auth, fetchConfig, fetchData } from "../apis";

export function ParallelDemo() {
  const [time, setTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{ data: unknown; config: unknown } | null>(null);

  useEffect(() => {
    const start = performance.now();

    async function fetchParallel() {
      // ✅ 正确写法：并行执行
      const sessionPromise = auth();
      const configPromise = fetchConfig();

      const session = await sessionPromise;
      const [config, data] = await Promise.all([
        configPromise,
        fetchData(session.user.id),
      ]);
      return { data, config };
    }

    fetchParallel().then((res) => {
      const elapsed = performance.now() - start;
      setTime(elapsed);
      setResult(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="demo parallel">
      <h3>✅ Parallel</h3>
      <p className="description">
        并行执行：auth + fetchConfig 同时启动，然后 fetchData
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
