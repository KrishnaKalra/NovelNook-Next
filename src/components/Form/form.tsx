"use client";
import React, { useEffect, useState } from "react";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  isbn: z.string().length(13),
  title: z.string(),
  author: z.string(),
  comment: z
    .string()
    .min(100, {
      message: "Review must be at least 100 characters.",
    })
    .max(250, { message: "Review cannot exceed 250 characters." }),
  userId: z.string(),
});
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
const MyForm = ({ reviewId }) => {
 
  const { data: session } = useSession();
  let user: User = session?.user as User;
  const route = useRouter();
  useEffect(() => {
    const getDefault = async () => {
      const response = await axios.get(`/api/reviews/${reviewId}`);
      console.log(response.data);
      form.setValue('isbn', response.data.isbn)
      form.setValue("author", response.data.author);
      form.setValue("title", response.data.title);
    }
    if(session?.user)
      form.setValue('userId',user._id);
    if (reviewId)
      getDefault();
  }, [])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "67d9d8c7013bd2b4712d23c9",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      if (reviewId) {
        const response = await axios.put(`/api/reviews/${reviewId}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      else {
        const response = await axios.post("/api/reviews", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      toast("Review Submitted Successfully");
      route.replace('/review')
    } catch (error) {
      console.error("Error Submitting Review", error);
      toast("Error Submitting Review");
    }

  }
  const apiCall = async () => {
    const isbn = form.watch("isbn");
    try {
      const response = await fetch(`/api/bookDetails/${isbn}`);

      const data = await response.json();
      console.log("Book Title:", data.bookTitle);
      console.log("Author Name:", data.authorName);
      form.setValue("author", data.authorName);
      form.setValue("title", data.bookTitle);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[90%] w-[80%] flex-col justify-center space-y-2"
      >
        <FormLabel>Book Review</FormLabel>
        <div className="align-items flex w-[100%] justify-between">
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem className="w-[90%]">
                <FormControl>
                  <Input
                    placeholder="ISBN"
                    {...field}
                    onChange={(e) => {
                      form.setValue("isbn", e.target.value);
                      console.log(form.watch("isbn"));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="mt-1 !h-[25px] w-[30px]"
            onClick={() => {
              apiCall();
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title of Book" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Author of Book" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="h-[50%]">
              <FormControl className="h-[100%]">
                <Textarea
                  placeholder="Write your Review"
                  {...field}
                  className="!h-[100%] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Post</Button>
      </form>
    </Form>
  );
};

export default MyForm;
