// 模拟 auth() - 延迟 100ms
export async function auth(): Promise<{ user: { id: string } }> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { user: { id: "user-123" } };
}

// 模拟 fetchConfig() - 延迟 100ms
export async function fetchConfig(): Promise<{ theme: string }> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { theme: "dark" };
}

// 模拟 fetchData(userId) - 延迟 100ms
export async function fetchData(userId: string): Promise<{ items: string[] }> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { items: [`data for ${userId}`] };
}
