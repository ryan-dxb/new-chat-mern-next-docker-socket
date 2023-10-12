import { NextPage } from "next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pencil } from "lucide-react";
import FormInputField from "../authForms/common/FormInputField";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

interface InputWithIconProps {
  icon: React.ReactNode;
  placeholder: string;
  name: string;
  disabled?: boolean;
  control?: any;
}

const InputWithIcon: NextPage<InputWithIconProps> = ({
  icon,
  placeholder,
  name,
  disabled,
  control,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
        <FormItem className="">
          <FormControl>
            <div className="relative flex items-center justify-center flex-1 h-10 rounded-md">
              <Button
                className="flex px-3 rounded-r-none disabled:opacity-70 disabled:bg-blue-500 "
                disabled
              >
                {icon}
              </Button>
              <div className="flex flex-1 w-full ">
                <Input
                  placeholder={placeholder}
                  className="relative w-full h-10 min-w-full px-4 py-2 border-2 border-l-0 rounded-l-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 "
                  disabled={disabled}
                  {...field}
                />
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputWithIcon;
