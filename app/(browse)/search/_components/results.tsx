import { Skeleton } from "@/components/ui/skeleton";
import { getSearch } from "@/lib/services/search-service";
import React from "react";
import ResultCard, { ResultCardSkeleton } from "./result-card";

type ResultsProps = { term?: string };

const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);
  return (
    <div>
      <h2 className="text-lg  font-semibold mb-4">
        Results has term &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found. Try searching something else
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <ResultCard data={result} key={result.id} />
        ))}
      </div>
    </div>
  );
};

export default Results;

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div>{[...Array(4).map((_, i) => <ResultCardSkeleton key={i} />)]}</div>
    </div>
  );
};
