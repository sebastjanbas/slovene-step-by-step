'use server'

import { checkRole } from '@/utils/roles'
import { clerkClient } from '@clerk/nextjs/server'

export async function setRole(formData: FormData) {
  const client = await clerkClient()

  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    return { message: 'Not Authorized', success: false }
  }

  try {
    const res = await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    })
    return { message: res.publicMetadata, success: true }
  } catch (err) {
    return { message: err, success: false }
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient()

  try {
    const res = await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: null },
    })
    return { message: res.publicMetadata, success: true }
  } catch (err) {
    return { message: err, success: false }
  }
}


export async function getUsers(search: string | null) {

  const client = await clerkClient();

  const users = search ? (await client.users.getUserList({
    query: search,
  })).data : (await client.users.getUserList()).data;

  return {
    users: users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0].emailAddress,
      role: user.publicMetadata.role,
    })),
  };
}