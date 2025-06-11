import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UserBasicInfoSection from "../../features/user-profile/components/user-basic/index.tsx";
import Incomes from "../../features/user-kyc/components/incomes/index.tsx";
import Assets from "../../features/user-kyc/components/assets/index.tsx";
import Liabilities from "../../features/user-kyc/components/liabilities/index.tsx";
import SourceOfWealth from "../../features/user-kyc/components/source-of-wealth/index.tsx";
import Breadcrumb from "../../components/Breadcrumb/index.tsx";
import NetWorth from "../../features/user-kyc/components/net-worth/index.tsx";
import Investments from "../../features/user-kyc/components/investments/index.tsx";
import {
  Card,
  Label,
  TextInput,
  Button,
  Select,
  HRTrimmed,
} from "flowbite-react";

const KycForm = ({ userId }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };
  const isOfficer = false;
  const fetchKycData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}u/kyc${
          userId !== undefined ? "/" + userId : ""
        }`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await response.json();
      reset(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchKycData();
  }, [userId]);
  return (
    <>
      <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          {/* No need edit */}
          <Breadcrumb
            items={[{ label: "Users", href: "/pages/home" }, { label: "KYC" }]}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
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
                </div>
              )}
            </div>
            <UserBasicInfoSection
              watch={watch}
              isEdit={false}
              register={register}
              control={control}
              errors={{}}
            />
            <div className="flex flex-wrap gap-2 justify-between align-center">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white inline-flex self-center">
                Financial status
              </h1>
            </div>
            <Incomes
              isEdit={isEdit}
              register={register}
              control={control}
              errors={{}}
            />
            <Assets
              isEdit={isEdit}
              register={register}
              control={control}
              errors={{}}
            />
            <Liabilities
              isEdit={isEdit}
              register={register}
              control={control}
              errors={{}}
            />
            <SourceOfWealth
              isEdit={isEdit}
              register={register}
              control={control}
              errors={{}}
            />
            <NetWorth />
            <Investments
              watch={watch}
              isEdit={isEdit}
              register={register}
              control={control}
              errors={{}}
            />
            {isEdit && (
              <div className="flex justify-end mt-4 gap-2">
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
    </>
  );
};

export default KycForm;
