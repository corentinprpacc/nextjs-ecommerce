/* eslint-disable react/display-name */
"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCartIcon } from "lucide-react"
import { forwardRef, Ref } from "react"

interface ShoppingCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event?: any) => void
}

const ShoppingCartButton = forwardRef(
  (
    { onClick, ...props }: ShoppingCartButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="icon"
        onClick={onClick}
        {...props}
      >
        <ShoppingCartIcon className="h-5 w-5" />
      </Button>
    )
  },
)

export default ShoppingCartButton
