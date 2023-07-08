import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { useFaucetCSPR } from "@/services/faucet/faucet/hooks";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { validatePublicKey } from "@/utils/validator";

const validationSchema = z.object({
    publicKey: z.string().min(1, 'Public key is required').refine((val) => {
        return validatePublicKey(val);
      }, 'Invalid public key'),
    asset: z.string().optional(),
});

export const FaucetForm = () => {
    const form = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            publicKey: '',
            asset: 'CSPR',
        }
    });
    const faucetCSPRMutation = useFaucetCSPR({
        onSuccess: () => {
            toast.success('Faucet request sent successfully');
        }
    });

    const onSubmit = (data: {publicKey: string}) => {
        faucetCSPRMutation.mutate(data);
    }

    return (

        <Form {...form}>
        <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Faucet</CardTitle>
        </CardHeader>
        <CardContent>
            <form className="gap-1 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="publicKey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Public Key</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your public key" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="asset"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Asset</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="min-w-[180px]">
                                        <SelectValue placeholder="Select a token" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="CSPR">CSPR</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
                </CardContent>
        <CardFooter className="flex justify-center">
        <Button variant={'outline'} type="submit">
                        {
                            faucetCSPRMutation.isLoading ? 'Loading...' : 'Request 4 CSPR'
                        }
                    </Button>
        </CardFooter>
        </Card>
        </Form>
       
    )
  }