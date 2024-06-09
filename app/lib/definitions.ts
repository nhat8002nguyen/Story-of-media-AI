interface ChatMessage {
  Role: string;
  Parts: [
    | string
    | {
        MIMEType: string;
        Data: string;
      },
  ];
}
