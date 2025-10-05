import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Skip numeric IDs in breadcrumbs, use more friendly labels
      if (/^\d+$/.test(path)) {
        if (paths[index - 1] === 'projects') {
          breadcrumbs.push({ label: 'Project', href: currentPath });
        } else if (paths[index - 1] === 'assets') {
          breadcrumbs.push({ label: 'Asset', href: currentPath });
        } else if (paths[index - 1] === 'threads') {
          breadcrumbs.push({ label: 'Thread', href: currentPath });
        }
      } else {
        // Capitalize and format
        const label = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        breadcrumbs.push({ label, href: currentPath });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          )}
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {index === 0 ? (
                <Home className="w-4 h-4" />
              ) : (
                item.label
              )}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
