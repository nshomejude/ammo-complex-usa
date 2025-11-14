import { Mail, MessageSquare, Phone, MessageCircle, Shield, Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ContactWidget2 = () => {
  return (
    <Card className="border-2 bg-gradient-to-br from-background to-secondary/20">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6 text-center">Secure Communication</h3>
        
        <div className="grid gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 backdrop-blur">
            <Mail className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Email</p>
              <p className="text-sm font-mono truncate">contact@armscomplex.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 backdrop-blur">
            <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Telegram</p>
              <p className="text-sm font-mono truncate">@armscomplex</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 backdrop-blur">
            <Phone className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Phone</p>
              <p className="text-sm font-mono">+1 (234) 567-890</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 backdrop-blur">
            <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">XMPP</p>
              <p className="text-sm font-mono truncate">support@xmpp.armscomplex.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 backdrop-blur">
            <Shield className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Session ID</p>
              <p className="text-xs font-mono break-all">05a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 backdrop-blur">
            <Key className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">PGP Fingerprint</p>
              <p className="text-xs font-mono break-all">1A2B 3C4D 5E6F 7G8H 9I0J</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
