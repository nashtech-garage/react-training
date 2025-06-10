import React from "react";
import { Card, Label, TextInput, Select, Button, HR } from "flowbite-react"; // Replace with your actual imports
import { useFieldArray } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

interface Occupation {
  occupation: string;
  from: string;
  to: string;
}

interface UserOccupationProps {
  isEdit: boolean;
  register: UseFormRegister<FormData>;
  occupations?: any[];
  control: any;
  errors: any;
}

const UserOccupation: React.FC<UserOccupationProps> = ({
  occupations,
  isEdit,
  register,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "occupations",
  });
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Occupation
      </h5>
      {fields?.length === 0 && (
        <div className="text-gray-500">No occupations available.</div>
      )}

      {(fields ?? []).map((field, index: number) => {
        const occupation = occupations?.[index] || {};
        return (
          <div key={index}>
            {index > 0 && <HR />}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`occupation-${index}`}>
                    Occupation <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Select
                      id={`occupation-${index}`}
                      required
                      {...register(`occupations.${index}.occupation` as const, {
                        required: true,
                      })}
                      defaultValue={
                        occupation.occupation === "Employed"
                          ? "0"
                          : occupation.occupation === "Unemployed"
                          ? "1"
                          : occupation.occupation || ""
                      }
                      color={
                        errors?.[index]?.occupation ? "failure" : undefined
                      }
                    >
                      <option value="">Select occupation</option>
                      <option value="0">Employed</option>
                      <option value="1">Unemployed</option>
                    </Select>
                    {errors?.[index]?.occupation && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index]?.occupation.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label
                    htmlFor={`occupation-${index}`}
                    className="font-normal"
                  >
                    {occupation.occupation || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`from-${index}`}>
                    From Date <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`from-${index}`}
                      type="date"
                      required
                      defaultValue={occupation.from || ""}
                      {...register(`occupations.${index}.from` as const, {
                        required: "From date is required",
                      })}
                      color={errors?.[index]?.from ? "failure" : undefined}
                    />
                    {errors?.[index]?.from && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index].from.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`from-${index}`} className="font-normal">
                    {occupation.from || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`to-${index}`}>To Date</Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`to-${index}`}
                      type="date"
                      defaultValue={occupation.to || ""}
                      {...register(`occupations.${index}.to` as const)}
                      color={errors?.[index]?.to ? "failure" : undefined}
                    />
                    {errors?.[index]?.to && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index].to.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`to-${index}`} className="font-normal">
                    {occupation.to || ""}
                  </Label>
                )}
              </div>
            </div>
            {isEdit && (
              <div className="flex mt-3">
                <Button color="red" onClick={() => remove(index)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        );
      })}
      {isEdit && fields?.length < 5 && (
        <div className="mt-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              append({ occupation: "", from: "", to: "" });
            }}
            color="green"
          >
            {" "}
            Add Occupation{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserOccupation;
