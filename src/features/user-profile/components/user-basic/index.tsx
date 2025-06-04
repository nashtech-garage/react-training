import React from "react";
import { Card, Label, TextInput } from "flowbite-react";

type UserBasicInfoProps = {
  userData: {
    email?: string;
    firstname?: string;
    middlename?: string;
    lastname?: string;
    dateofbirth?: string;
    age?: number | string;
    isofficer?: boolean;
  };
  isEdit: boolean;
  register: any; // Replace with proper type from react-hook-form if used
};

const UserBasicInfoSection: React.FC<UserBasicInfoProps> = ({
  userData,
  isEdit,
  register,
}) => (
  <Card className="my-3">
    <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
      Basic Information
    </h5>
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="mb-2 block">
          <Label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </Label>
        </div>
        {isEdit ? (
          <TextInput
            id="email"
            type="email"
            placeholder="example@email.com"
            required
            defaultValue={userData?.email || ""}
            {...register("email")}
          />
        ) : (
          <Label htmlFor="email" className="font-normal">
            {userData?.email || ""}
          </Label>
        )}
      </div>
      <div className="flex-1">
        <div className="mb-2 block">
          <Label htmlFor="firstname">
            First name <span className="text-red-600">*</span>
          </Label>
        </div>
        {isEdit ? (
          <TextInput
            id="firstname"
            type="text"
            placeholder="Khoa"
            required
            defaultValue={userData?.firstname || ""}
            {...register("firstname")}
          />
        ) : (
          <Label htmlFor="firstname" className="font-normal">
            {userData?.firstname || ""}
          </Label>
        )}
      </div>
      <div className="flex-1">
        <div className="mb-2 block">
          <Label htmlFor="middlename">Middle name</Label>
        </div>
        {isEdit ? (
          <TextInput
            id="middlename"
            type="text"
            placeholder="Van"
            defaultValue={userData?.middlename || ""}
            {...register("middlename")}
          />
        ) : (
          <Label htmlFor="middlename" className="font-normal">
            {userData?.middlename || ""}
          </Label>
        )}
      </div>
      <div className="flex-1">
        <div className="mb-2 block">
          <Label htmlFor="lastname">
            Last name <span className="text-red-600">*</span>
          </Label>
        </div>
        {isEdit ? (
          <TextInput
            id="lastname"
            type="text"
            placeholder="Nguyen"
            required
            defaultValue={userData?.lastname || ""}
            {...register("lastname")}
          />
        ) : (
          <Label htmlFor="lastname" className="font-normal">
            {userData?.lastname || ""}
          </Label>
        )}
      </div>
    </div>
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="mb-2 block">
          <Label htmlFor="dateofbirth">
            Date of Birth <span className="text-red-600">*</span>
          </Label>
        </div>
        {isEdit ? (
          <TextInput
            id="dateofbirth"
            type="date"
            defaultValue={userData?.dateofbirth || ""}
            {...register("dateofbirth")}
          />
        ) : (
          <Label htmlFor="dateofbirth" className="font-normal">
            {userData?.dateofbirth || ""}
          </Label>
        )}
      </div>
      <div className="flex-1">
        <div className="mb-2 block">
          <Label htmlFor="age">Age</Label>
        </div>
        <Label className="font-normal" htmlFor="age">
          {userData?.age || ""}
        </Label>
      </div>
      <div className="flex-2">
        <div className="mb-2 block">
          <Label htmlFor="isofficer">Role</Label>
        </div>
        <Label htmlFor="isofficer" className="font-normal">
          {userData?.isofficer ? "Officer" : "Guest"}
        </Label>
      </div>
    </div>
  </Card>
);

export default UserBasicInfoSection;