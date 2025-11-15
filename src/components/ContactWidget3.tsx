import { Mail, MessageSquare, Phone, MessageCircle, Shield, Key, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { contactConfig } from "@/config/theme";

export const ContactWidget3 = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactData = [
    {
      icon: Mail,
      label: "Email",
      value: contactConfig.email,
      link: contactConfig.emailLink
    },
    {
      icon: MessageSquare,
      label: "Telegram",
      value: contactConfig.telegram,
      link: contactConfig.telegramLink
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactConfig.phone,
      link: contactConfig.phoneLink
    },
    {
      icon: MessageCircle,
      label: "XMPP",
      value: "support@xmpp.armscomplex.com",
      link: "xmpp:support@xmpp.armscomplex.com"
    },
    {
      icon: Shield,
      label: "Session ID",
      value: "05a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
      link: null
    },
    {
      icon: Key,
      label: "PGP Key",
      value: "1A2B 3C4D 5E6F 7G8H 9I0J K1L2 M3N4 O5P6 Q7R8 S9T0",
      link: null
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Contact Methods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {contactData.map((contact) => (
          <div
            key={contact.label}
            className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <contact.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-1">{contact.label}</p>
              {contact.link ? (
                <a
                  href={contact.link}
                  className="text-sm text-muted-foreground hover:text-primary break-all"
                >
                  {contact.value}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground break-all font-mono">
                  {contact.value}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0"
              onClick={() => copyToClipboard(contact.value, contact.label)}
            >
              {copiedField === contact.label ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
