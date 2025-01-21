import { Button } from "@/components/ui/button";
import { t } from "i18next";
import React from "react";

interface ButtonListProps {
  onPlanned: () => void;
  onWatched: () => void;
  onInProgress: () => void;
  disabled: boolean;
}

export const ButtonList: React.FC<ButtonListProps> = ({
  onPlanned,
  onInProgress,
  onWatched,
  disabled,
}) => {
  return (
    <>
      <Button
        disabled={disabled}
        onClick={onPlanned}
        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-500 transition"
      >
        {t("Planned")}
      </Button>
      <Button
        disabled={disabled}
        onClick={onInProgress}
        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-500 transition"
      >
        {t("InProgress")}
      </Button>
      <Button
        onClick={onWatched}
        disabled={disabled}
        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-500 transition"
      >
        {t("Watched")}
      </Button>
    </>
  );
};
