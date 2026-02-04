import type { Project } from "@/content/projects";

interface ProjectMetaProps {
  project: Project;
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">{project.year}</p>
      <p className="text-sm text-muted">{project.role}</p>
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted border border-border px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
