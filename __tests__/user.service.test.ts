import { Request, Response } from 'express'
import UserService from '../services/ user.service'

// UserController class definition
class UserController {
  private userService: UserService

  // Constructor initializes UserService instance
  constructor() {
    this.userService = new UserService()
  }

  // Handles GET /users request
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      // Call the findAll method of the UserService
      const users = await this.userService.findAll()

      // Send the users as a response
      res.status(200).json(users)
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message })
    }
  }

  // Handles GET /users/:id request
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      // Get the user ID from the request parameters
      const id = req.params.id

      // Call the findById method of the UserService
      const user = await this.userService.findById(id)

      // If the user is not found, send a 404 response
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      // Send the user as a response
      res.status(200).json(user)
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message })
    }
  }

  // Handles POST /users request
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Get the user data from the request body
      const user = req.body

      // Call the createUser method of the UserService
      const createdUser = await this.userService.createUser(user)

      // Send the created user as a response
      res.status(201).json(createdUser)
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message })
    }
  }

  // Handles PUT /users/:id request
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      // Get the user ID from the request parameters
      const id = req.params.id

      // Get the updated user data from the request body
      const user = req.body

      // Call the updateUser method of the UserService
      const updatedUser = await this.userService.updateUser(id, user)

      // If the user is not found, send a 404 response
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      // Send the updated user as a response
      res.status(200).json(updatedUser)
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message })
    }
  }

  // Handles DELETE /users/:id request
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      // Get the user ID from the request parameters
      const id = req.params.id

      // Call the deleteUser method of the UserService
      const deletedUser = await this.userService.deleteUser(id)

      // If the user is not found, send a 404 response
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      // Send the deleted user as a response
      res.status(200).json(deletedUser)
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message })
    }
  }

  // Handles GET /users/stats request
  public async getUsersStats(req: Request, res: Response): Promise<void> {
    try {
      // Call the getUsersStats method of the UserService
      const usersStats = await this.userService.getUsersStats()

      // Send the users statistics as a response
      res.status(200).json(usersStats)
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message })
    }
  }
}

export default UserController
