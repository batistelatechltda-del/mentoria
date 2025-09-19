async function getConversation() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}/api/client/conversation/get/all`,
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );

    const text = await res.text();

    if (!res.ok) {
      console.error(
        `[API ERROR ${res.status}] /conversation/get/all`,
        text.slice(0, 500)
      );
      return [];
    }

    try {
      const data = JSON.parse(text);
      return data?.data ?? [];
    } catch (e) {
      console.error(
        "[API INVALID JSON] /conversation/get/all",
        text.slice(0, 500)
      );
      return [];
    }
  } catch (err) {
    console.error("[FETCH ERROR] /conversation/get/all", err);
    return [];
  }
}

async function getSidebarData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}/api/client/conversation/todo/get-all`,
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );

    const text = await res.text();

    if (!res.ok) {
      console.error(
        `[API ERROR ${res.status}] /conversation/todo/get-all`,
        text.slice(0, 500)
      );
      return {};
    }

    try {
      const data = JSON.parse(text);
      return data?.data ?? {};
    } catch (e) {
      console.error(
        "[API INVALID JSON] /conversation/todo/get-all",
        text.slice(0, 500)
      );
      return {};
    }
  } catch (err) {
    console.error("[FETCH ERROR] /conversation/todo/get-all", err);
    return {};
  }
}
