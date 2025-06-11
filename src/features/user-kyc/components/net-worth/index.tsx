import React from "react";
import {
  Card,
  Label,
} from "flowbite-react";

const NetWorth: React.FC = ({}) => {
  return (
    <>
      <Card className="my-3">
        <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
          Net Worth
        </h5>
        <div className="flex gap-4">
          <div className="mr-2">
            <div className="mb-2 block">
              <Label htmlFor={`total-label`}>Total</Label>
            </div>
            <Label htmlFor={`total`} className="font-normal">
              0$
            </Label>
          </div>
        </div>
      </Card>
    </>
  );
};

export default NetWorth;
