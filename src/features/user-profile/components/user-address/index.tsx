import React from "react";
import { Card, Label, TextInput, Button, Select, HR } from "flowbite-react";
import type { UseFormRegister } from "react-hook-form";
//
interface Contacts {
  country?: string;
  city?: string;
  street?: string;
  postalcode?: string;
  type?: string;
}

interface FormData {
  contacts?: Contacts[];
  [key: string]: any;
}

interface UserAddressSectionProps {
  userData: FormData;
  isEdit: boolean;
  register: UseFormRegister<FormData>;
  setUserData: React.Dispatch<React.SetStateAction<FormData | null>>;
  contacts?: Contacts[];
}

export const UserAddressSection: React.FC<UserAddressSectionProps> = ({
  contacts,
  isEdit,
  register,
  setUserData,
}) => {
  function removeContact(index: number) {
    setUserData((prev) => {
      if (!prev) return prev;
      const updatedContacts = [...(prev.contacts || [])];
      console.log("updatedContacts", updatedContacts);
      // updatedContacts.splice(index, 1);
      // console.log("updatedContacts 2", updatedContacts);
      return { ...prev, contacts: updatedContacts };
    });
  }
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Address
      </h5>
      {contacts?.length === 0 && (
        <div className="text-gray-500">No addresses available.</div>
      )}
      {(contacts ?? []).map((contact: Contacts, index: number) => (
        <div key={index}>
          {index > 0 && <HR />}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor={`country-${index}`}>
                  Country <span className="text-red-600">*</span>
                </Label>
              </div>
              {isEdit ? (
                <TextInput
                  id={`country-${index}`}
                  type="text"
                  placeholder="Country"
                  required={true}
                  defaultValue={contact.country || ""}
                  {...register(`contacts.${index}.country` as const, {
                    required: true,
                  })}
                />
              ) : (
                <Label htmlFor={`country-${index}`} className="font-normal">
                  {contact.country || ""}
                </Label>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor={`city-${index}`}>
                  City <span className="text-red-600">*</span>
                </Label>
              </div>
              {isEdit ? (
                <TextInput
                  id={`city-${index}`}
                  type="text"
                  placeholder="City"
                  defaultValue={contact.city || ""}
                  {...register(`contacts.${index}.city` as const, {
                    required: true,
                  })}
                />
              ) : (
                <Label htmlFor={`city-${index}`} className="font-normal">
                  {contact.city || ""}
                </Label>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor={`street-${index}`}>
                  Street <span className="text-red-600">*</span>
                </Label>
              </div>
              {isEdit ? (
                <TextInput
                  id={`street-${index}`}
                  type="text"
                  placeholder="Street"
                  defaultValue={contact.street || ""}
                  {...register(`contacts.${index}.street` as const, {
                    required: true,
                  })}
                />
              ) : (
                <Label htmlFor={`street-${index}`} className="font-normal">
                  {contact.street || ""}
                </Label>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor={`postalcode-${index}`}>Postal Code</Label>
              </div>
              {isEdit ? (
                <TextInput
                  id={`postalcode-${index}`}
                  type="text"
                  placeholder="Postal Code"
                  defaultValue={contact.postalcode || ""}
                  {...register(`contacts.${index}.postalcode` as const)}
                />
              ) : (
                <Label htmlFor={`postalcode-${index}`} className="font-normal">
                  {contact.postalcode || ""}
                </Label>
              )}
            </div>
            <div className="flex-2">
              <div className="mb-2 block">
                <Label htmlFor={`type-${index}`}>
                  Type <span className="text-red-600">*</span>
                </Label>
              </div>
              {isEdit ? (
                <Select
                  className="w-sm"
                  id={`type-${index}`}
                  {...register(`contacts.${index}.type` as const, {
                    required: true,
                  })}
                  defaultValue={
                    contact.type === "Work"
                      ? "1"
                      : contact.type === "Mailing"
                      ? "0"
                      : contact.type || ""
                  }
                >
                  <option value="">Select type</option>
                  <option value="0">Mailing</option>
                  <option value="1">Work</option>
                </Select>
              ) : (
                <Label htmlFor={`type-${index}`} className="font-normal">
                  {contact.type === "1"
                    ? "Work"
                    : contact.type === "0"
                    ? "Mailing"
                    : contact.type || ""}
                </Label>
              )}
            </div>
          </div>
          {isEdit && (
            <div className="flex mt-3">
              <Button color="red" onClick={() => removeContact(index)}>
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
      {isEdit && (
        <div className="flex justify-end mt-4">
          <Button
            disabled={(contacts?.length ?? 0) >= 5}
            pill
            color="green"
            type="button"
            onClick={() => {
              setUserData((prev) => {
                if ((prev?.contacts?.length ?? 0) >= 5) return prev;
                const base = prev ?? {
                  email: "",
                  firstname: "",
                  contacts: [],
                };
                return {
                  ...base,
                  contacts: [
                    ...(base.contacts || []),
                    {
                      country: "",
                      city: "",
                      street: "",
                      postalcode: "",
                      type: "",
                    },
                  ],
                };
              });
            }}
          >
            Add Address
          </Button>
        </div>
      )}
    </Card>
  );
};
