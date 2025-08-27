import RemindersPage from "@/components/dashboard/reminder";
import { cookies } from "next/headers";

async function getReminders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}/api/client/reminder/get-all`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return data?.data == null ? [] : data?.data || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function page() {
  const reminders: any = await getReminders();
  return <RemindersPage reminder={reminders} />;
}

export default page;
