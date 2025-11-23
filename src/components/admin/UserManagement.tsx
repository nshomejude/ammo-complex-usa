import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users, Shield } from "lucide-react";

interface User {
  id: string;
  username: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userRoles, setUserRoles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const { data: usersData, error: usersError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (usersError) {
      toast.error('Failed to fetch users');
      return;
    }

    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('user_id, role');

    if (!rolesError && rolesData) {
      const rolesMap = rolesData.reduce((acc, role) => {
        acc[role.user_id] = role.role;
        return acc;
      }, {} as Record<string, string>);
      setUserRoles(rolesMap);
    }

    setUsers(usersData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdminRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin';
    
    const { error } = await supabase
      .from('user_roles')
      .update({ role: newRole })
      .eq('user_id', userId);

    if (error) {
      toast.error('Failed to update user role');
    } else {
      toast.success(`User role updated to ${newRole}`);
      fetchUsers();
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage user accounts and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No users found</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const role = userRoles[user.id] || 'customer';
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username || 'N/A'}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
                          {role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleAdminRole(user.id, role)}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          {role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
