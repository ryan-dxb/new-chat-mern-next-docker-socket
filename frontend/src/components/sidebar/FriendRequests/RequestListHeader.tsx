import { NextPage } from "next";

interface RequestListHeaderProps {
  header: string;
}

const RequestListHeader: NextPage<RequestListHeaderProps> = ({ header }) => {
  return (
    <div className="flex-grow-0 h-fit">
      <p>
        <span className="text-xs font-semibold text-muted-foreground">
          {header}
        </span>
      </p>
    </div>
  );
};

export default RequestListHeader;
