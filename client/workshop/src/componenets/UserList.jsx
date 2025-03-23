import Search from './Search'
import Pagination from './Pagination'
import UserListItem from './UserListItem'
import { useEffect, useState } from 'react'
import userService from '../services/userService'
import UserCreate from './UserCreate'
import UserInfo from './UserInfo'
import UserDelete from './UserDelete'

export default function UserList() {     
    const [users, setUsers] = useState([])   
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false)
    const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(null)
    const [isUserDeleteModalOpen, setIsUserDeleteModalOpen] = useState(null)
    const [userIdEdit, setUserIdEdit] = useState(null)

    useEffect(() => {

        userService.getAll()
        .then(result =>{
            setUsers(result)
        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    /**
     * Handles opening the create user modal
     * Sets isCreateUserModalOpen state to true to display the modal
     */
    const addUserClickHandler = () => {
      setIsCreateUserModalOpen(true)
    }

    /** 
     * Handles closing the create user modal
     * Sets isCreateUserModalOpen state to false to hide the modal
     */
    const closeCreateUserClickHandler = () =>{
      setIsCreateUserModalOpen(false)
      setUserIdEdit(null)
    }

    /**
     * Handles the form submission for creating a new user
     * @param {Object} userData - The processed user data
     * @returns {Promise<void>}
     */
    const saveCreateUserClickHandler = async (userData) => {
        try {
            // Send create request to server and get new user data
            const newUser = await userService.create(userData);

            // Update local state with new user
            setUsers(state => [...state, newUser]);
            
            // Close the modal after successful creation
            setIsCreateUserModalOpen(false);
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    const UserInfoClickHandler = (userId) => {
      setIsUserInfoModalOpen(userId)
    }

    const closeUserInfoClickHandler = () => {
      setIsUserInfoModalOpen(null)
    }
    const UserDeleteClickHandler = (userId) => {
      setIsUserDeleteModalOpen(userId)
    }

    const closeUserDeleteClickHandler = () => {
      setIsUserDeleteModalOpen(null)
    }

    const userDeleteHandler = async () => {
      await userService.delete(isUserDeleteModalOpen)
      setUsers(state => state.filter(user => user._id !== isUserDeleteModalOpen))
      setIsUserDeleteModalOpen(null)
    }

    const userEditClickHandler = (userId) => {
      setUserIdEdit(userId)
    }

    const saveEditUserClickHandler = async (e) => {
      const userId = userIdEdit
      e.preventDefault()

      const formData = new FormData(e.target.parentElement.parentElement);
      const userData = Object.fromEntries(formData)

      const updatedUser =await userService.update(userId, userData)
      setUsers(state => state.map(user => user._id === userIdEdit ? updatedUser : user))
      
      setUserIdEdit(null)

    }

   

    

    // update local state


    // close modal


  return (
    <section className="card users-container">
      {/* Search bar component */}
      <Search />

      {isCreateUserModalOpen && <UserCreate 
      onClose={closeCreateUserClickHandler} 
      onSave={saveCreateUserClickHandler} 
      />}

      {isUserInfoModalOpen && (<UserInfo 
      userId={isUserInfoModalOpen}
      onClose={closeUserInfoClickHandler}
      />)}

      {isUserDeleteModalOpen && <UserDelete 
      userId={isUserDeleteModalOpen}
      onClose={closeUserDeleteClickHandler}
      onDelete={userDeleteHandler}
      />}

      {userIdEdit && (
        <UserCreate 
        userId = {userIdEdit}
        onClose={closeCreateUserClickHandler} 
        onEdit={saveEditUserClickHandler}
        />  
      )}


      {/* Table component */}
      <div className="table-wrapper">
        

        <table className="table">
          <thead>
            <tr>
              <th>
                Image
              </th>
              <th>
                First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                  data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>
                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>
                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>
                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>
                Created
                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                  data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Table row component */}
            {users.map(user => <UserListItem 
            key={user._id} 
            user={user}
            onUserInfoClick={UserInfoClickHandler}
            onUserDeleteClick={UserDeleteClickHandler}
            onUserEditClick={userEditClickHandler}
            />)}
          </tbody>
        </table>
      </div>

      {/* New user button  */}
      <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

      {/* Pagination component  */}
      <Pagination />
    </section>
  );
}
