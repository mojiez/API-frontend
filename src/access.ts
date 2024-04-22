/**
 * ant-design-pro内置的权限管理机制
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  // const { currentUser } = initialState ?? {};
  const { loginUser } = initialState ?? {};
  return {
    // 判断是不是管理员
    canAdmin: loginUser && loginUser.userRole === 'admin',
  };
}
