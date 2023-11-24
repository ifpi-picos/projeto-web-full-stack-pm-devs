import { Request, Response, Router } from 'express'
import { PostService } from '../services/postServices'
import { PostRepository } from '../repositories/postRepository'
import { Post } from '@prisma/client'


const router = Router()

const repositoryPost = new PostRepository()

router.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await new PostService(repositoryPost).getAllPosts();
  res.status(statusCode).json(body)
})

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { statusCode, body } = await new PostService(
      repositoryPost
    ).getPostById(id);

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error })
  }
});

router.post("/", async (req: Request, res: Response) => {
  const data: Pick<Post, "id" | "content" | "media" |"created_at" | "memberId"  | "muralId"> = req.body

const requiredFields: (keyof Pick<Post, "id" | "content" | "memberId" | "muralId">)[] = ["id", "content", "memberId", "muralId"]
  for(const field of requiredFields) {
    if(!data[field] || !data[field].toString().trim()) {
    return res.status(400).json(`The field ${field} id required.`)
    }
  }

  const { statusCode, body } = await new PostService(repositoryPost).addPost(data)
  res.status(statusCode).json(body)
})

router.put("/:id", async (req: Request, res: Response) => {
  const {id} = req.params
  const data = req.body
  const { statusCode, body } = await new PostService(repositoryPost).updatePost(id, data)
  res.status(statusCode).json(body);
})

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const { statusCode, body } = await new PostService(repositoryPost).removePost(id)
  res.status(statusCode).json(body);
})

export default router;