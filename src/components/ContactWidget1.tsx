import { Mail, MessageSquare, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContactWidget1 = () => {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <a href="mailto:contact@armscomplex.com" className="text-sm text-muted-foreground hover:text-primary">
                contact@armscomplex.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Telegram</p>
              <a href="https://t.me/armscomplex" className="text-sm text-muted-foreground hover:text-primary">
                @armscomplex
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-6" variant="default">
          Get in Touch
        </Button>
      </CardContent>
    </Card>
  );
};
