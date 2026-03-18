import "./App.css";
import { WaterfallDemo } from "./components/WaterfallDemo";
import { ParallelDemo } from "./components/ParallelDemo";

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>Async API Routes Demo</h1>
          <p>测试 API 请求的瀑布流 vs 并行执行性能差异</p>
        </div>
      </section>

      <section className="comparison">
        <div className="demo-container">
          <WaterfallDemo />
          <ParallelDemo />
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
