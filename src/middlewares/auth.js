export const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('auth_token') || 
               localStorage.getItem('usuario') || 
               localStorage.getItem('usuarioDeportista');
  
  // Si la ruta es pública o tiene token, permite el acceso
  if (to.meta.public || token) {
    return next();
  }
  
  // Redirige a login guardando la ruta que intentaba acceder
  next({
    path: '/login',
    query: { redirect: to.fullPath }
  });
};

export const checkAuth = () => {
  return localStorage.getItem('auth_token') || 
         localStorage.getItem('usuario') || 
         localStorage.getItem('usuarioDeportista');
};

export default {
  requireAuth,
  checkAuth
};