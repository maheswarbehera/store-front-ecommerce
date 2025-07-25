import React from "react";
import { Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ title, url, subTitle, subUrl, breadcrumbs }) {
  // const breadcrumbs=[
  //   { title: 'Parent', url: '/parent' },
  //   { title: 'Child', url: '/child' }
  // ]

  return (
    <nav className="flex py-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Home className="mr-4 h-4 w-4" />
          <Link
            to={url}
            className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
          >
            {title}
          </Link>
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="inline-flex items-center">
            <ChevronRight className="h-4 w-4" />
            <Link
              to={breadcrumb.url}
              className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
            >
              {breadcrumb.title}
            </Link>
          </li>
        ))}
        <li className="inline-flex items-center">  
        <ChevronRight className="h-4 w-4" />        
          <Link
            to={subUrl}
            className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
          >
            {subTitle}
          </Link>
        </li>
      </ol>
    </nav>
  );
}
