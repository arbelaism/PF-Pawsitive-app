import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { getUsers } from 'utils/dbFetching';


const TableUser = () => {
    const {
        data: users,
        error,
        isLoading,
        isSuccess
    } = useQuery(['users'], getUsers)

    return (
        <Box>
            
        </Box>
    )
}

export default TableUser