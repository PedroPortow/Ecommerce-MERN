export const authenticateAdmin = async (req, res, next) => {
  try {
    if (req.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Usuário precisa ser administrador" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar status de administrador", error });
  }
};