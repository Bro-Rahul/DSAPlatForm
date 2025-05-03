import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"


const AddNewField: React.FC<{
  onAddParameter : (payload:{parameterName:string,parameterType:string})=>void
}> = ({onAddParameter}) => {

  const [parameterName, setParameterName] = useState<string>('');
  const [parameterType, setParameterType] = useState<string>('string');
  const [open, setOpen] = useState<boolean>(false);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onAddParameter({parameterName,parameterType});
    setParameterName('');
    setParameterType('string');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={(e) => setOpen(true)} variant='outline' className="w-full align-middle">Add New Parameter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Parameter Detailes</DialogTitle>
          <DialogDescription>
            This is field will pass to the function
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Variable Name
            </label>
            <Input id="name" value={parameterName} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParameterName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="type" className="text-right">
              Variable Type
            </label>
            <Input id="username" value={parameterType} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParameterType(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewField;