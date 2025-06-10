import React from "react";
import { Card, Label, TextInput, Select, Button, HR } from "flowbite-react"; // Replace with your actual imports
import { useFieldArray } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

interface Email {
  email: string;
  type: string;
  preferred: string | boolean;
}

interface UserEmailsProps {
  isEdit: boolean;
  register: UseFormRegister<FormData>;
  emails?: Email[];
  control: any;
  errors: any;
}

const UserEmails: React.FC<UserEmailsProps> = ({
  emails,
  isEdit,
  register,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Emails
      </h5>
      {fields?.length === 0 && (
        <div className="text-gray-500">No emails available.</div>
      )}

      {(fields ?? []).map((field, index: number) => {
        const email = emails?.[index] || {};
        return (
          <div key={index}>
            {index > 0 && <HR />}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`email-${index}`}>
                    Email Address <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`email-${index}`}
                      type="email"
                      placeholder="example@email.com"
                      required
                      defaultValue={email.email || ""}
                      {...register(
                        `emails.${index}.email` as `emails.${number}.email`
                      )}
                      color={
                        errors?.[index]?.email
                          ? "failure"
                          : undefined
                      }
                    />
                    {errors?.[index]?.email && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index]?.email.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label
                    htmlFor={`email-${index}`}
                    className="font-normal"
                  >
                    {email.email || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`type-email-${index}`}>
                    Type <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Select
                      id={`type-email-${index}`}
                      required
                      {...register(
                        `emails.${index}.type` as `emails.${number}.type`
                      )}
                      defaultValue={
                        email.type === "Work"
                          ? "1"
                          : email.type === "Personal"
                          ? "0"
                          : email.type || ""
                      }
                      color={
                        errors?.[index]?.type ? "failure" : undefined
                      }
                    >
                      <option value="">Select type</option>
                      <option value="0">Personal</option>
                      <option value="1">Work</option>
                    </Select>
                    {errors?.[index]?.type && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index]?.type.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label
                    htmlFor={`type-email-${index}`}
                    className="font-normal"
                  >
                    {email.type || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`preferred-${index}`}>
                    Preferred <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Select
                      id={`preferred-${index}`}
                      required
                      {...register(`emails.${index}.preferred` as const)}
                      defaultValue={
                        email.preferred === true || email.preferred === "true"
                          ? "true"
                          : "false"
                      }
                      color={
                        errors?.[index]?.preferred
                          ? "failure"
                          : undefined
                      }
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Select>
                    {errors?.[index]?.preferred && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index]?.preferred.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`preferred-${index}`} className="font-normal">
                    {email.preferred === true || email.preferred === "true"
                      ? "Yes"
                      : "No"}
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
              append({
                email: "",
                type: "",
                preferred: "false",
              });
            }}
            color="green"
          >
            {" "}
            Add Email{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserEmails;
