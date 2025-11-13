import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { firearms as defaultFirearms } from "@/data/firearms";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const STORAGE_KEY = "firearms_data";

export const FirearmList = ({ onEdit, onAdd }: { onEdit: (firearm: any) => void; onAdd: () => void }) => {
  const [firearms, setFirearms] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultFirearms;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(firearms));
  }, [firearms]);

  const handleDelete = (id: string) => {
    setFirearms(firearms.filter((f: any) => f.id !== id));
    toast.success("Firearm deleted successfully");
    setDeleteId(null);
  };

  const filteredFirearms = firearms.filter((f: any) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.caliber.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search firearms by name, manufacturer, or caliber..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onAdd} className="bg-tactical hover:bg-tactical/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Firearm
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Caliber</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action Type</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFirearms.map((firearm: any) => (
                <TableRow key={firearm.id}>
                  <TableCell className="font-medium">{firearm.name}</TableCell>
                  <TableCell>{firearm.manufacturer}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {firearm.caliber.slice(0, 2).map((cal: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {cal}
                        </Badge>
                      ))}
                      {firearm.caliber.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{firearm.caliber.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>${firearm.price.toFixed(2)}</TableCell>
                  <TableCell>{firearm.actionType}</TableCell>
                  <TableCell>
                    {firearm.inStock ? (
                      <Badge variant="outline" className="border-tactical text-tactical">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-destructive text-destructive">
                        Out of Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(firearm)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(firearm.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mt-3">
        Showing {filteredFirearms.length} of {firearms.length} firearms
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Firearm</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this firearm? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
