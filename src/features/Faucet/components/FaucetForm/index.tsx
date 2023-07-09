import { useEffect } from 'react';

import { useAccount, useDisconnect } from '@casperdash/usewallet';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import LogoImg from '@/assets/images/logo.png';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAccountBalance } from '@/services/faucet/casperdash/user/hooks';
import { useFaucetCSPR } from '@/services/faucet/faucet/hooks';
import { validatePublicKey } from '@/utils/validator';

const validationSchema = z.object({
  publicKey: z
    .string()
    .min(1, 'Public key is required')
    .refine((val) => {
      return validatePublicKey(val);
    }, 'Invalid public key'),
  asset: z.string().optional(),
});

export const FaucetForm = () => {
  const { publicKey } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: { balance } = { balance: 0 } } = useGetAccountBalance({
    publicKey:
      '0106ae2a9cd180f2160bd87ed4bf564f34dffc40d71870bd425800f00f1e450ce3',
  });
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      publicKey: '',
      asset: 'CSPR',
    },
  });
  const faucetCSPRMutation = useFaucetCSPR({
    onSuccess: () => {
      toast.success('Faucet request sent successfully');
    },
    onError: (error) => {
      toast.error(_.get(error, 'response.data.message', 'An error occurred'));
    },
  });

  const onSubmit = (data: { publicKey: string }) => {
    faucetCSPRMutation.mutate(data);
  };

  useEffect(() => {
    if (!publicKey) return;
    form.setValue('publicKey', publicKey);
  }, [form, publicKey]);

  return (
    <Form {...form}>
      <form className="gap-1 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full">
          <CardHeader>
            <CardDescription className="flex justify-center">
              <a href="https://casperdash.io" target="_blank" rel="noreferrer">
                <img src={LogoImg} alt="Faucet" width={200} height={200} />
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="publicKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Key (Testnet)</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="Enter your public key"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.publicKey?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="asset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="min-w-[180px]">
                        <SelectValue placeholder="Select a token" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CSPR">
                        CSPR {balance ? `(${balance})` : '(...)'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center gap-10">
            <Button type="submit">
              {faucetCSPRMutation.isLoading ? 'Loading...' : 'Request 10 CSPR'}
            </Button>
            <Button
              type="button"
              variant={'outline'}
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
