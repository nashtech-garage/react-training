import React from "react";
import { Card, Label, TextInput, Select, Button, HR } from "flowbite-react"; // Replace with your actual imports
import { useFieldArray } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

interface Identification {
  type: string;
  expire_date: string;
  file: string;
}

interface UserIdentificationsProps {
  isEdit: boolean;
  register: UseFormRegister<FormData>;
  identifications?: any[];
  control: any;
  errors: any;
}

const UserIdentifications: React.FC<UserIdentificationsProps> = ({
  identifications,
  isEdit,
  register,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "identifications",
  });

  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Identification Documents
      </h5>
      {fields?.length === 0 && (
        <div className="text-gray-500">No identifications available.</div>
      )}
      {(fields ?? []).map((field, index: number) => {
        const identification = identifications?.[index] || {};
        return (
          <div key={index} className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor={`type-${index}`}>
                  Type <span className="text-red-600">*</span>
                </Label>
              </div>
              {isEdit ? (
                <>
                  <Select
                    id={`type-${index}`}
                    required
                    {...register(`identifications.${index}.type` as const, {
                      required: "Type is required",
                    })}
                    defaultValue={
                      identification.type === 0
                        ? "Passport"
                        : identification.type === 1
                        ? "National ID"
                        : identification.type === 2
                        ? "Driver License"
                        : ""
                    }
                    color={errors?.[index]?.type ? "failure" : undefined}
                  >
                    <option value="">Select type</option>
                    <option value="0">Passport</option>
                    <option value="1">National ID</option>
                    <option value="2">Driver License</option>
                  </Select>
                  {errors?.[index]?.type && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[index].type.message}
                    </p>
                  )}
                </>
              ) : (
                <Label htmlFor={`type-${index}`} className="font-normal">
                  {identification.type || ""}
                </Label>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor={`expire_date-${index}`}>
                  Expiry Date <span className="text-red-600">*</span>
                </Label>
              </div>
              {isEdit ? (
                <>
                  <TextInput
                    id={`expire_date-${index}`}
                    type="date"
                    required
                    defaultValue={identification.expire_date || ""}
                    {...register(
                      `identifications.${index}.expire_date` as const,
                      {
                        required: "Expiry date is required",
                      }
                    )}
                    color={errors?.[index]?.expire_date ? "failure" : undefined}
                  />
                  {errors?.[index]?.expire_date && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[index].expire_date.message}
                    </p>
                  )}
                </>
              ) : (
                <Label htmlFor={`expire_date-${index}`} className="font-normal">
                  {identification.expire_date || ""}
                </Label>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor={`file-${index}`}>
                  Upload Document <span className="text-red-600">*</span>
                </Label>
              </div>
              {isEdit ? (
                <>
                  <TextInput
                    id={`file-${index}`}
                    type="file"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register(`identifications.${index}.file` as const, {
                      required: "Document is required",
                    })}
                    color={errors?.[index]?.file ? "failure" : undefined}
                  />
                  {errors?.[index]?.file && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[index].file.message}
                    </p>
                  )}
                </>
              ) : (
                <Label htmlFor={`file-${index}`} className="font-normal">
                  {identification.file ? "Document Uploaded" : ""}
                </Label>
              )}
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
              append({
                type: "",
                expire_date: "",
                file: "",
              });
            }}
            color="green"
          >
            {" "}
            Add Identification{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserIdentifications;
