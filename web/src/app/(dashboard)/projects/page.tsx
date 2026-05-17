export default function ProjectsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">
          项目列表壳（M0：可空数据，后续接入 API）。
        </p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        暂无项目。创建流程将在后续里程碑接入。
      </div>
    </div>
  );
}
