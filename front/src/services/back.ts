/*
caso o front e o back estejam em hosts diferentes,
Então vão ter a mesma url, porém se estiverem no
mesmo host a url do for server vai ter o nome
do serviço do back no lugar do domínio
*/

export const baseUrlForClient = "http://localhost:3000";
export const baseUrlForServer =
  process.env.BACKEND_URL_FOR_SERVER ?? "http://back:3000";
