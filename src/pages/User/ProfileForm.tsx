import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Card,
  Label,
  TextInput,
  Button,
  Select,
  HRTrimmed,
} from "flowbite-react";
import { useStore } from "../../shared";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/index.tsx";
import UserBasicInfoSection from "../../features/user-profile/components/user-basic/index.tsx";
import { UserAddressSection } from "../../features/user-profile/components/user-address/index.tsx";

interface Contacts {
  country?: string;
  city?: string;
  street?: string;
  postalcode?: string;
  type?: string;
}

interface Email {
  emailaddress: string;
  type: string;
  preferred: boolean | string;
}

interface Phone {
  phonenumber: string;
  type: string;
  preferred: boolean | string;
}

interface Identification {
  idtype: string;
  idexpiry: string;
  idfile: FileList | string;
}

interface Occupation {
  occupation: string;
  occupationFrom: string;
  occupationTo?: string;
}

interface FormData {
  email: string;
  firstname: string;
  middlename?: string;
  lastname?: string;
  dateofbirth?: string;
  age?: number;
  isofficer?: boolean;
  country?: string;
  city?: string;
  street?: string;
  postalcode?: string;
  type?: string;
  contacts?: Contacts[];
  emails?: Email[];
  phones?: Phone[];
  idtype?: string;
  idexpiry?: string;
  idfile?: FileList | string;
  identifications?: Identification[];
  occupations?: Occupation[];
  // Add other fields as needed
}

const ProfileForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const authenticatedData = useStore((state) => state.userData);
  const isOfficer = authenticatedData?.isofficer || false;
  const [userData, setUserData] = useState<FormData | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data);
  };

  const goToKYC = () => {
    navigate(`/pages/users/${params.id}/kyc`);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}u/profile`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Fetched user data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
      <div className="mb-4 col-span-full xl:mb-2">
        <Breadcrumb
          items={[
            { label: "Users", href: "/pages/users" },
            { label: "Profile", href: `/pages/users/${params.id}` },
          ]}
        />
        <form className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 justify-between align-center">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white inline-flex self-center">
              Personal Information
            </h1>
            {!isOfficer && (
              <div className="flex items-center gap-2">
                <Button
                  pill
                  color="alternative"
                  className="bg-primary-700"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  {isEdit ? "Cancel" : "Edit"}
                </Button>
                <Button pill color="alternative">
                  KYC
                </Button>
              </div>
            )}
          </div>

          <UserBasicInfoSection
            userData={userData ?? {}}
            isEdit={isEdit}
            register={register}
          />
          <UserAddressSection
            contacts={userData?.contacts || []}
            isEdit={isEdit}
            register={register}
            setUserData={setUserData}
          />
          {/* <Card className="my-3">
            <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
              Address
            </h5>
            {userData?.contacts?.map((contact: Contacts, index: number) => (
              <div key={index}>
                {index > 0 && <HRTrimmed />}
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
                      <Label
                        htmlFor={`country-${index}`}
                        className="font-normal"
                      >
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
                        {...(register(`contacts.${index}.city` as const),
                        {
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
                        {...(register(`contacts.${index}.street` as const),
                        {
                          required: true,
                        })}
                      />
                    ) : (
                      <Label
                        htmlFor={`street-${index}`}
                        className="font-normal"
                      >
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
                      <Label
                        htmlFor={`postalcode-${index}`}
                        className="font-normal"
                      >
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
                        {...(register(`contacts.${index}.type` as const),
                        {
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
                <div className="flex mt-3">
                  <Button color="red">Delete</Button>
                </div>
              </div>
            ))}
            {isEdit && (
              <div className="flex justify-end mt-4">
                <Button
                  disabled={(userData?.contacts?.length ?? 0) >= 5}
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
          </Card> */}
          {/* <Card className="my-3">
            <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
              Emails
            </h5>
            {userData?.emails?.map?.((emailObj: any, index: number) => (
              <div key={index}>
                {index > 0 && <HRTrimmed />}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label htmlFor={`emailaddress-${index}`}>
                        Email Address <span className="text-red-600">*</span>
                      </Label>
                    </div>
                    {isEdit ? (
                      <TextInput
                        id={`emailaddress-${index}`}
                        type="email"
                        placeholder="example@email.com"
                        required
                        defaultValue={emailObj.emailaddress || ""}
                        {...register(`emails.${index}.emailaddress` as const)}
                      />
                    ) : (
                      <Label
                        htmlFor={`emailaddress-${index}`}
                        className="font-normal"
                      >
                        {emailObj.emailaddress || ""}
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
                      <Select
                        id={`type-email-${index}`}
                        required
                        {...register(`emails.${index}.type` as const)}
                        defaultValue={
                          emailObj.type === "Work"
                            ? "1"
                            : emailObj.type === "Personal"
                            ? "0"
                            : emailObj.type || ""
                        }
                      >
                        <option value="">Select type</option>
                        <option value="0">Personal</option>
                        <option value="1">Work</option>
                      </Select>
                    ) : (
                      <Label
                        htmlFor={`type-email-${index}`}
                        className="font-normal"
                      >
                        {emailObj.type || ""}
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
                      <Select
                        id={`preferred-${index}`}
                        required
                        {...register(`emails.${index}.preferred` as const)}
                        defaultValue={
                          emailObj.preferred === true ||
                          emailObj.preferred === "true"
                            ? "true"
                            : "false"
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Select>
                    ) : (
                      <Label
                        htmlFor={`preferred-${index}`}
                        className="font-normal"
                      >
                        {emailObj.preferred === true ||
                        emailObj.preferred === "true"
                          ? "Yes"
                          : "No"}
                      </Label>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isEdit && (
              <div className="flex justify-end mt-4">
                <Button
                  disabled={(userData?.emails?.length ?? 0) >= 5}
                  pill
                  color="green"
                  type="button"
                  onClick={() => {
                    setUserData((prev) => {
                      if ((prev?.emails?.length ?? 0) >= 5) return prev;
                      const base = prev ?? {
                        email: "",
                        firstname: "",
                        emails: [],
                      };
                      return {
                        ...base,
                        emails: [
                          ...(base.emails || []),
                          {
                            emailaddress: "",
                            type: "",
                            preferred: "false",
                          },
                        ],
                      };
                    });
                  }}
                >
                  Add Email
                </Button>
              </div>
            )}
          </Card>
          <Card className="my-3">
            <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
              Phones
            </h5>
            {userData?.phones?.map?.((phoneObj: any, index: number) => (
              <div key={index}>
                {index > 0 && <HRTrimmed />}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label htmlFor={`phonenumber-${index}`}>
                        Phone Number <span className="text-red-600">*</span>
                      </Label>
                    </div>
                    {isEdit ? (
                      <TextInput
                        id={`phonenumber-${index}`}
                        type="tel"
                        placeholder="Phone Number"
                        required
                        defaultValue={phoneObj.phonenumber || ""}
                        {...register(`phones.${index}.phonenumber` as const)}
                      />
                    ) : (
                      <Label
                        htmlFor={`phonenumber-${index}`}
                        className="font-normal"
                      >
                        {phoneObj.phonenumber || ""}
                      </Label>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label htmlFor={`type-phone-${index}`}>
                        Type <span className="text-red-600">*</span>
                      </Label>
                    </div>
                    {isEdit ? (
                      <Select
                        id={`type-phone-${index}`}
                        required
                        {...register(`phones.${index}.type` as const)}
                        defaultValue={
                          phoneObj.type === "Work"
                            ? "1"
                            : phoneObj.type === "Personal"
                            ? "0"
                            : phoneObj.type || ""
                        }
                      >
                        <option value="">Select type</option>
                        <option value="0">Personal</option>
                        <option value="1">Work</option>
                      </Select>
                    ) : (
                      <Label
                        htmlFor={`type-phone-${index}`}
                        className="font-normal"
                      >
                        {phoneObj.type || ""}
                      </Label>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label htmlFor={`preferred-phone-${index}`}>
                        Preferred <span className="text-red-600">*</span>
                      </Label>
                    </div>
                    {isEdit ? (
                      <Select
                        id={`preferred-phone-${index}`}
                        required
                        {...register(`phones.${index}.preferred` as const)}
                        defaultValue={
                          phoneObj.preferred === true ||
                          phoneObj.preferred === "true"
                            ? "true"
                            : "false"
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Select>
                    ) : (
                      <Label
                        htmlFor={`preferred-phone-${index}`}
                        className="font-normal"
                      >
                        {phoneObj.preferred === true ||
                        phoneObj.preferred === "true"
                          ? "Yes"
                          : "No"}
                      </Label>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isEdit && (
              <div className="flex justify-end mt-4">
                <Button
                  disabled={(userData?.phones?.length ?? 0) >= 5}
                  pill
                  color="green"
                  type="button"
                  onClick={() => {
                    setUserData((prev) => {
                      if ((prev?.phones?.length ?? 0) >= 5) return prev;
                      const base = prev ?? {
                        email: "",
                        firstname: "",
                        phones: [],
                      };
                      return {
                        ...base,
                        phones: [
                          ...(base.phones || []),
                          {
                            phonenumber: "",
                            type: "",
                            preferred: "false",
                          },
                        ],
                      };
                    });
                  }}
                >
                  Add Phone
                </Button>
              </div>
            )}
          </Card>
          <Card className="my-3">
            <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
              Identification Documents
            </h5>
            {userData?.identifications?.map?.((ident: any, index: number) => (
              <div key={index} className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="mb-2 block">
                    <Label htmlFor={`idtype-${index}`}>
                      Type <span className="text-red-600">*</span>
                    </Label>
                  </div>
                  {isEdit ? (
                    <Select
                      id={`idtype-${index}`}
                      required
                      {...register(`identifications.${index}.idtype` as const, {
                        required: true,
                      })}
                      defaultValue={ident.idtype || ""}
                    >
                      <option value="">Select type</option>
                      <option value="passport">Passport</option>
                      <option value="driver_license">Driver License</option>
                      <option value="national_id">National ID</option>
                    </Select>
                  ) : (
                    <Label htmlFor={`idtype-${index}`} className="font-normal">
                      {ident.idtype || ""}
                    </Label>
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-2 block">
                    <Label htmlFor={`idexpiry-${index}`}>
                      Expiry Date <span className="text-red-600">*</span>
                    </Label>
                  </div>
                  {isEdit ? (
                    <TextInput
                      id={`idexpiry-${index}`}
                      type="date"
                      required
                      defaultValue={ident.idexpiry || ""}
                      {...register(
                        `identifications.${index}.idexpiry` as const,
                        { required: true }
                      )}
                    />
                  ) : (
                    <Label
                      htmlFor={`idexpiry-${index}`}
                      className="font-normal"
                    >
                      {ident.idexpiry || ""}
                    </Label>
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-2 block">
                    <Label htmlFor={`idfile-${index}`}>
                      Upload Document <span className="text-red-600">*</span>
                    </Label>
                  </div>
                  {isEdit ? (
                    <TextInput
                      id={`idfile-${index}`}
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register(`identifications.${index}.idfile` as const, {
                        required: true,
                      })}
                    />
                  ) : (
                    <Label htmlFor={`idfile-${index}`} className="font-normal">
                      {ident.idfile ? "Document Uploaded" : ""}
                    </Label>
                  )}
                </div>
              </div>
            ))}
            {isEdit && (
              <div className="flex justify-end mt-2">
                <Button
                  disabled={(userData?.identifications?.length ?? 0) >= 5}
                  pill
                  color="green"
                  type="button"
                  onClick={() => {
                    setUserData((prev) => {
                      if ((prev?.identifications?.length ?? 0) >= 5)
                        return prev;
                      const base = prev ?? {
                        email: "",
                        firstname: "",
                        identifications: [],
                      };
                      return {
                        ...base,
                        identifications: [
                          ...(base.identifications || []),
                          {
                            idtype: "",
                            idexpiry: "",
                            idfile: "",
                          },
                        ],
                      };
                    });
                  }}
                >
                  Add Identification
                </Button>
              </div>
            )}
          </Card>
          <Card className="my-3">
            <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
              Occupation
            </h5>
            {userData?.occupations?.map?.(
              (occupationObj: any, index: number) => (
                <div key={index}>
                  {index > 0 && <HRTrimmed />}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label htmlFor={`occupation-${index}`}>
                          Occupation <span className="text-red-600">*</span>
                        </Label>
                      </div>
                      {isEdit ? (
                        <Select
                          id={`occupation-${index}`}
                          required
                          {...register(
                            `occupations.${index}.occupation` as const,
                            { required: true }
                          )}
                          defaultValue={occupationObj.occupation || ""}
                        >
                          <option value="">Select occupation</option>
                          <option value="student">Student</option>
                          <option value="engineer">Engineer</option>
                          <option value="teacher">Teacher</option>
                          <option value="doctor">Doctor</option>
                          <option value="business">Business</option>
                          <option value="other">Other</option>
                        </Select>
                      ) : (
                        <Label
                          htmlFor={`occupation-${index}`}
                          className="font-normal"
                        >
                          {occupationObj.occupation || ""}
                        </Label>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label htmlFor={`occupationFrom-${index}`}>
                          From Date <span className="text-red-600">*</span>
                        </Label>
                      </div>
                      {isEdit ? (
                        <TextInput
                          id={`occupationFrom-${index}`}
                          type="date"
                          required
                          defaultValue={occupationObj.occupationFrom || ""}
                          {...register(
                            `occupations.${index}.occupationFrom` as const,
                            { required: true }
                          )}
                        />
                      ) : (
                        <Label
                          htmlFor={`occupationFrom-${index}`}
                          className="font-normal"
                        >
                          {occupationObj.occupationFrom || ""}
                        </Label>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 block">
                        <Label htmlFor={`occupationTo-${index}`}>To Date</Label>
                      </div>
                      {isEdit ? (
                        <TextInput
                          id={`occupationTo-${index}`}
                          type="date"
                          defaultValue={occupationObj.occupationTo || ""}
                          {...register(
                            `occupations.${index}.occupationTo` as const
                          )}
                        />
                      ) : (
                        <Label
                          htmlFor={`occupationTo-${index}`}
                          className="font-normal"
                        >
                          {occupationObj.occupationTo || ""}
                        </Label>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
            {isEdit && (
              <div className="flex justify-end mt-4">
                <Button
                  disabled={(userData?.occupations?.length ?? 0) >= 5}
                  pill
                  color="green"
                  type="button"
                  onClick={() => {
                    setUserData((prev) => {
                      if ((prev?.occupations?.length ?? 0) >= 5) return prev;
                      const base = prev ?? {
                        email: "",
                        firstname: "",
                        occupations: [],
                      };
                      return {
                        ...base,
                        occupations: [
                          ...(base.occupations || []),
                          {
                            occupation: "",
                            occupationFrom: "",
                            occupationTo: "",
                          },
                        ],
                      };
                    });
                  }}
                >
                  Add Occupation
                </Button>
              </div>
            )}
          </Card>
          */}
          {isEdit && (
            <div className="flex justify-end mt-4 gap-2">
              <Button
                pill
                color="alternative"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Cancel
              </Button>
              <Button
                pill
                color="green"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
